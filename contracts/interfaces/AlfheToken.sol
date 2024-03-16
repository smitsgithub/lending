// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.19;

import "../FHERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import { FHE, euint16, inEuint16 } from "@fhenixprotocol/contracts/FHE.sol";


/**
 * @title Alpha token contract
 * @notice Implements Alpha token contracts
 * @author Alpha
 */

contract AlphaToken is FHERC20("AlphaToken", "ALPHA"), Ownable {
  function mintEncrypted(address _to, inEuint16 _value) public onlyOwner {
    mintEncryptedTo(_to, FHE.asEuint16(_value));
  }
}