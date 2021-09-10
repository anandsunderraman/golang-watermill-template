/**
 * Input: parsed asyncapi object
 * Output: object which indicates what protocols are present in the async api document
 * Curently supports AMQP alone
 * Example Output:
 * {
 *   "hasAMQP": true
 * }
 */
export function GetProtocolFlags(asyncapi) {

  let protocolFlags = {
    hasAMQP: false
  }

  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  //if there are no channels do nothing
  if (channelEntries.length === 0) {
      return protocolFlags
  }

  //if there are no amqp publisher or subscribers do nothing
  let hasAMQP = channelEntries.filter(([channelName, channel]) => {
      return (channel.hasPublish() || channel.hasSubscribe) && channel.bindings().amqp
  }).length > 0;

  protocolFlags.hasAMQP = hasAMQP;
  
  return protocolFlags;
}