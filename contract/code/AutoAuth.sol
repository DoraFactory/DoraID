// "SPDX-License-Identifier: UNLICENSED"
pragma solidity 0.8.2;

import { DoraID, IERC20 } from "./DoraID.sol";

contract AutoAuth {
  DoraID public DORA_ID;
  IERC20 public DORA;
  address public owner;

  constructor () {
    owner = msg.sender;
  }

  function setDoraID(DoraID _id, IERC20 _token) external {
    require(msg.sender == owner);
    DORA_ID = _id;
    DORA = _token;
  }

  function activate() external {
    DORA_ID.activate(msg.sender);
  }

  function withdraw() external {
    require(msg.sender == owner);
    DORA.transfer(owner, DORA.balanceOf(address(this)));
  }
}
