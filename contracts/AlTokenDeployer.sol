// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

import "./FHERC20.sol";
import "./LendingPool.sol";
import "./AlToken.sol";

/**
 * @title Alpha token deployer
 * @notice Implements Alpha token deployer
 * @author Alpha
 */

contract AlTokenDeployer {
  /**
   * @dev deploy AlToken for the lending pool
   * @param _name the name of AlToken
   * @param _symbol the token symbol of AlToken
   * @param _underlyingAsset the underlying ERC20 token of the AlToken
   */
  function createNewAlToken(
    string memory _name,
    string memory _symbol,
    FHERC20 _underlyingAsset
  ) public returns (AlToken) {
    AlToken alToken = new AlToken(_name, _symbol, LendingPool(msg.sender), _underlyingAsset);
    return alToken;
  }
}