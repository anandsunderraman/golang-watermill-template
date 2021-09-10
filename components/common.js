const _ = require('lodash');

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

/**
 * Input: parsed asyncapi object
 * Output: object which indicates what protocols have subscribers
 * Curently supports AMQP alone
 * Example Output:
 * {
 *   "hasAMQPSub": true
 * }
 */
 export function GetSubscriberFlags(asyncapi) {

  let subscriberFlags = {
    hasAMQPSub: false
  }

  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  //if there are no channels do nothing
  if (channelEntries.length === 0) {
      return subscriberFlags
  }

  //if there are no amqp publisher or subscribers do nothing
  let hasAMQPSub = channelEntries.filter(([channelName, channel]) => {
      return channel.hasPublish() && channel.bindings().amqp
  }).length > 0;

  subscriberFlags.hasAMQPSub = hasAMQPSub;
  
  return subscriberFlags;
}

export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}