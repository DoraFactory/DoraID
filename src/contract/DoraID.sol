// "SPDX-License-Identifier: UNLICENSED"
pragma solidity ^0.8.0;

/**
 * @title ERC20
 * @dev Basic interface of ERC20 Standard
 */
interface ERC20 {
  function balanceOf(address who) external view returns (uint256);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {
  function mul(uint256 a, uint256 b) internal pure returns (uint256 c) {
    if (a == 0) {
      return 0;
    }
    c = a * b;
    assert(c / a == b);
    return c;
  }

  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    assert(b <= a);
    return a - b;
  }

  function add(uint256 a, uint256 b) internal pure returns (uint256 c) {
    c = a + b;
    assert(c >= a);
    return c;
  }
}

contract DoraID {
  using SafeMath for uint256;

  ERC20 public DORAYAKI;

  uint256 constant public MIN_AUTH_STAKING = 10 ether;
  uint256 constant public MIN_AUTH_DURATION = 30 days;

  uint256 constant public FORCE_QUIT_THRESHOLD = 10000 ether;
  uint256 constant public FORCE_QUIT_DURATION = 30 days;

  uint256 constant public ACTIVATION_FEE = 10 ether * 10 days;
  uint256 constant public MAX_STORED_POS = 20 * ACTIVATION_FEE;

  struct UserInfo {
    address parent;
    address[] children;
  
    bool authenticated;
    uint256 stakingAmount;
    uint256 stakingEndTime;
    uint256 proofOfStake;
    uint256 lastSeen;
  }

  mapping(address => UserInfo) internal _users;

  mapping(address => uint256) internal _tips;
  mapping(address => address) internal _entrusteds;

  bool private _rentrancyLock;

  event Activate(address indexed _parent, address indexed _child);
  event Stake(address indexed _user, uint256 _totalAmount, uint256 _endTime);

  constructor(ERC20 _dora, address[] memory _initUserList, uint256[] memory _initPOSList) {
    DORAYAKI = _dora;

    require(_initUserList.length == _initPOSList.length);

    for (uint256 i = 0; i < _initUserList.length; i++) {
      address addr = _initUserList[i];
      uint256 POS = _initPOSList[i];

      _users[addr].proofOfStake = POS;
      _activate(address(this), addr);
    }
  }

  /**
   * @dev Prevents a contract from calling itself, directly or indirectly.
   */
  modifier nonReentrant() {
    require(!_rentrancyLock);
    _rentrancyLock = true;
    _;
    _rentrancyLock = false;
  }

  function statusOf(address _user) public view returns (bool authenticated, uint256 stakingAmount, uint256 stakingEndTime) {
    UserInfo storage user = _users[_user];
    authenticated = user.authenticated;
    stakingAmount = user.stakingAmount;
    stakingEndTime = user.stakingEndTime;
  }

  function proofOf(address _user) public view returns (uint256 proof) {
    UserInfo storage user = _users[_user];
    if (!user.authenticated) {
      return 0;
    }
    proof = user.proofOfStake + (block.timestamp - user.lastSeen) * user.stakingAmount;
    if (proof > MAX_STORED_POS) {
      proof = MAX_STORED_POS;
    }
  }

  function tipOf(address _user) public view returns (uint256 tip, address entrusted) {
    tip = _tips[_user];
    entrusted = _entrusteds[_user];
  }

  function parentOf(address _user) public view returns (address) {
    return _users[_user].parent;
  }

  function childrenSizeOf(address _user) public view returns (uint256) {
    return _users[_user].children.length;
  }

  function childOf(address _user, uint256 _index) public view returns (address) {
    uint256 size = childrenSizeOf(_user);
    require(_index < size);
    return _users[_user].children[_index];
  }

  function stake(uint256 _amount, uint256 _endTime, uint256 _tip, address _entrusted) public {
    uint256 tip = _tips[msg.sender];
    if (tip > 0) {
      _tips[msg.sender] = 0;
      require(DORAYAKI.transfer(msg.sender, tip));
    }
    require(DORAYAKI.transferFrom(msg.sender, address(this), _tip));
    _tips[msg.sender] = _tip;
    _entrusteds[msg.sender] = _entrusted;
    
    stake(_amount, _endTime);
  }
  function stake(uint256 _amount, uint256 _endTime) public nonReentrant {
    require(DORAYAKI.transferFrom(msg.sender, address(this), _amount));

    UserInfo storage user = _users[msg.sender];
    _updatePOS(user);

    require(user.stakingEndTime <= _endTime);
    
    uint256 totalStaking = user.stakingAmount.add(_amount);

    user.stakingAmount = totalStaking;
    user.stakingEndTime = _endTime;

    emit Stake(msg.sender, totalStaking, _endTime);
  }

  function unstake(uint256 _amount) public {
    unstake(_amount, 0);
  }
  function unstake(uint256 _amount, uint256 _endTime) public nonReentrant {
    UserInfo storage user = _users[msg.sender];
    _updatePOS(user);

    require(user.stakingEndTime < block.timestamp);
    require(user.stakingEndTime <= _endTime || _endTime == 0);

    uint256 remainder = user.stakingAmount.sub(_amount);
  
    user.stakingAmount = remainder;
    user.stakingEndTime = _endTime;

    require(DORAYAKI.transfer(msg.sender, _amount));

    emit Stake(msg.sender, remainder, _endTime);
  }

  function activate(address _newUser) public nonReentrant {
    UserInfo storage user = _users[msg.sender];
    _updatePOS(user);
    UserInfo storage newUser = _users[_newUser];

    address entrusted = _entrusteds[_newUser];
    require(entrusted == address(0) || entrusted == msg.sender);
  
    require(user.authenticated);
    require(user.proofOfStake >= ACTIVATION_FEE);
    user.proofOfStake -= ACTIVATION_FEE;
  
    require(!newUser.authenticated);
    require(newUser.stakingAmount >= MIN_AUTH_STAKING);
    require(newUser.stakingEndTime >= block.timestamp + MIN_AUTH_DURATION);

    uint256 tip = _tips[_newUser];
    if (tip > 0) {
      _tips[_newUser] = 0;
      DORAYAKI.transfer(msg.sender, tip);
    }
    newUser.lastSeen = block.timestamp;
    _activate(msg.sender, _newUser);
  }

  function forceQuit() public {
    UserInfo storage user = _users[msg.sender];
    _updatePOS(user);

    require(user.stakingAmount >= FORCE_QUIT_THRESHOLD);
    user.stakingEndTime = block.timestamp + FORCE_QUIT_DURATION;

    emit Stake(msg.sender, user.stakingAmount, user.stakingEndTime);
  }

  function _activate(address _parent, address _child) internal {
    _users[_parent].children.push(_child);
    _users[_child].parent = _parent;
    _users[_child].authenticated = true;

    emit Activate(_parent, _child);
  }

  function _updatePOS(UserInfo storage _user) internal returns (uint256 proof) {
    if (_user.authenticated) {
      proof = _user.proofOfStake + (block.timestamp - _user.lastSeen) * _user.stakingAmount;
    }
    if (proof > MAX_STORED_POS) {
      proof = MAX_STORED_POS;
    }
     _user.proofOfStake = proof;
    _user.lastSeen = block.timestamp;
  }
}
