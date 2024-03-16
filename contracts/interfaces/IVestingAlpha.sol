// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

import { FHE, euint16, inEuint16 } from "@fhenixprotocol/contracts/FHE.sol";


/**
 * @title Alpha vesting interface
 * @notice The interface for the alpha vesting contract.
 * @author Alpha
 */
 

interface IVestingAlpha {

  /**
   * @dev accumulate Alpha token to user
   * @param _user the user account address
   * @param _amount the amount of Alpha token to accumulate
   */
  function accumulateAlphaToUser(address _user, inEuint16 calldata _amount) external;
}