pragma solidity ^0.8.19;

import { FHE, euint16, inEuint16 } from "@fhenixprotocol/contracts/FHE.sol";


/**
 * @title Alpha receiver interface
 * @notice The interface of Alpha token reward receiver
 * @author Alpha
 **/

interface IAlphaReceiver {
  /**
   * @notice receive Alpha token from the distributor
   * @param _amount the amount of Alpha token to receive
   */
  function receiveAlpha(inEuint16 calldata _amount) external;
}