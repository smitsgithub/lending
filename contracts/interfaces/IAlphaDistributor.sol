pragma solidity ^0.8.19;

import {AlfheToken} from "./AlfheToken.sol";

/**
 * @title Alpha distributor interface
 * @notice The interface of Alpha distributor for Alpha token rewards
 * @author Alpha
 **/

interface IAlphaDistributor {
  /**
   * @notice get the Alpha token of the distributor
   * @return AlfheToken - the Alpha token
   */
  function alphaToken() external view returns (AlfheToken);

  /**
   * @notice distribute the Alpha token to the receivers
   */
  function poke() external;
}