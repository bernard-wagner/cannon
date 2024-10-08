// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

/* solhint-disable meta-transactions/no-msg-sender */
/* solhint-disable meta-transactions/no-msg-data */

/**
 * @title Used by packages to enable compatibility with ERC2771 trusted forwarder
 */
library ERC2771Context {
  // This is the trusted-multicall-forwarder. The address is constant due to CREATE2.
  address private constant _TRUSTED_FORWARDER = 0xE2C5658cC5C448B48141168f3e475dF8f65A1e3e;

  function msgSender() internal view returns (address sender) {
    if (isTrustedForwarder(msg.sender) && msg.data.length >= 20) {
      // The assembly code is more direct than the Solidity version using `abi.decode`.
      /// @solidity memory-safe-assembly
      assembly {
        sender := shr(96, calldataload(sub(calldatasize(), 20)))
      }
    } else {
      return msg.sender;
    }
  }

  function msgData() internal view returns (bytes calldata) {
    if (isTrustedForwarder(msg.sender) && msg.data.length >= 20) {
      return msg.data[:msg.data.length - 20];
    } else {
      return msg.data;
    }
  }

  function isTrustedForwarder(address forwarder) internal pure returns (bool) {
    return forwarder == _TRUSTED_FORWARDER;
  }

  function trustedForwarder() internal pure returns (address) {
    return _TRUSTED_FORWARDER;
  }
}
