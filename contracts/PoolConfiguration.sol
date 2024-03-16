// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IPoolConfiguration.sol";
import { FHE, euint16, inEuint16 } from "@fhenixprotocol/contracts/FHE.sol";

/**
 * @title Default pool configuration contract
 * @notice Implements the configuration of the ERC20 token pool.
 * @author Alpha
 **/

contract PoolConfiguration is IPoolConfiguration, Ownable {

  /**
   * @notice the borrow interest rate calculation
   * Borrow interest rate(%)
   *  ^
   *  |             |    /
   *  |             |   /
   *  |             |  /<------ rate slope 2
   *  |             | /
   *  |         ____|/
   *  |    ____/    |
   *  | __/<--------|-------- rate slope 1
   *  |/<-----------|-------- base borrow rate
   *  |-------------|------|  Utilization rate(%)
   *  0             80    100
   *               ^   ^
   *               |   | excess utilization rate
   *               | optimal utilization rate
   *
   * When the utilization rate is too high (over 80%) the the pool will use rate slope 2 to calculate
   * the borrow interest rate which grow very fast to protect the liquidity in the pool.
   */

  // optimal utilization rate at 80%
  uint16 public constant OPTIMAL_UTILIZATION_RATE = 0.8 * 1e2;
  // excess utilization rate at 20%
  uint16 public constant EXCESS_UTILIZATION_RATE = 0.2 * 1e2;

  uint16 public baseBorrowRate;
  uint16 public rateSlope1;
  uint16 public rateSlope2;
  uint16 public collateralPercent;
  uint16 public liquidationBonusPercent;

  constructor(
    uint16 _baseBorrowRate,
    uint16 _rateSlope1,
    uint16 _rateSlope2,
    uint16 _collateralPercent,
    uint16 _liquidationBonusPercent
  ) Ownable(msg.sender) {
    baseBorrowRate = _baseBorrowRate;
    rateSlope1 = _rateSlope1;
    rateSlope2 = _rateSlope2;
    collateralPercent = _collateralPercent;
    liquidationBonusPercent = _liquidationBonusPercent;
  }

  /**
   * @dev get base borrow rate of the ERC20 token pool
   * @return base borrow rate
   */
  function getBaseBorrowRate() external override(IPoolConfiguration) view returns (uint256) {
    return baseBorrowRate;
  }

  /**
   * @dev get collateral percent of the ERC20 token pool
   * @return collateral percent
   * Basically the collateral percent is the percent that liquidity can be use as collteral to cover the user's loan
   */
  function getCollateralPercent() external override(IPoolConfiguration) view returns (uint256) {
    return collateralPercent;
  }

  /**
   * @dev get the liquidation bonus of the ERC20 token pool
   * @return liquidation bonus percent
   * the liquidation bunus percent used for collateral amount calculation.
   * How many collateral that liquidator will receive when the liquidation is success.
   */
  function getLiquidationBonusPercent()
    external
    override(IPoolConfiguration)
    view
    returns (uint256)
  {
    return liquidationBonusPercent;
  }

  /**
   * @dev calculate the annual interest rate based on utilization rate
   * @param _totalBorrows the total borrows of the ERC20 token pool
   * @param _totalLiquidity the total liquidity of the ERC20 token of the pool
   * First, calculate the utilization rate as below formula
   * utilization rate = total borrows / (total borrows + available liquidity)
   * Second, calculate the annual interest rate
   * As the above graph which show the relative between the utilization rate and the borrow interest rate.
   * There are 2 cases:
   * 1. the utilization rate is less than or equal 80%
   * - the borrow interest rate = base borrow rate + (utilization rate * rate slope 1 / optimal utilization rate)
   * 2. the utilization rate is excessed 80%. In this case the borrow interest rate will be very high.
   * - the excess utilization rate ratio = (utilization rate - optimal utilization rate) / excess utilization rate
   * - the borrow interest rate = base borrow rate + rate slope 1 + (rate slope 2 * excess utilization rate ratio)
   */
  function calculateInterestRate(euint16 _totalBorrows, euint16 _totalLiquidity)
    external
    override
    view
    returns (uint16)
  {
    uint16 utilizationRate = getUtilizationRate(_totalBorrows, _totalLiquidity);

    if (utilizationRate > OPTIMAL_UTILIZATION_RATE) {
      uint256 excessUtilizationRateRatio = (utilizationRate - OPTIMAL_UTILIZATION_RATE) / (
        EXCESS_UTILIZATION_RATE
      );
      return (baseBorrowRate + (rateSlope1) + (rateSlope2)) * uint16(excessUtilizationRateRatio);
    } else {
      return
        baseBorrowRate + ((utilizationRate * (rateSlope1)) / (OPTIMAL_UTILIZATION_RATE));
    }
  }

  /**
   * @dev get optimal utilization rate of the ERC20 token pool
   * @return the optimal utilization
   */
  function getOptimalUtilizationRate() external override view returns (uint256) {
    return OPTIMAL_UTILIZATION_RATE;
  }

  /**
   * @dev calculate the utilization rateOwnable(msg.sender)
   * @param _totalBorrows the total borrows of the ERC20 token pool
   * @param _totalLiquidity the total liquidity of the ERC20 token of the pool
   * @return utilizationRate the utilization rate of the ERC20 pool
   */
  function getUtilizationRate(euint16 _totalBorrows, euint16 _totalLiquidity)
    public
    view
    returns (uint16 utilizationRate)
  {
    euint16 EutilizationRate = FHE.select(_totalLiquidity.eq(FHE.asEuint16(0)),
     FHE.asEuint16(0), _totalBorrows.div(_totalLiquidity));
     utilizationRate= FHE.decrypt(EutilizationRate);
  }
}