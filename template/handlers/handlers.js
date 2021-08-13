const { File } = require('@asyncapi/generator-react-sdk');
const _ = require('lodash');

export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function({ asyncapi, params }) {
  let channelWrappers = [];
  const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
  channelWrappers = channelEntries.map(([channelName, channel]) => {
      const publishMessage = channel.publish() ? channel.publish().message(0).payload().$id() : undefined;
      const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
      
      
  
      return {
          channelName: channelName,
          publishMessage: pascalCase(publishMessage),
          subscribeMessage: subscribeMessage,
          operation: pascalCase(channel.publish().id())
      }
  })

  let handlersContent = `
package handlers

import (
  "encoding/json"
  "fmt"
  "github.com/ThreeDotsLabs/watermill/message"
  "${params.moduleName}/payloads"
  "log"
)
    `
    channelWrappers.forEach(channel => {
      handlersContent = handlersContent + `
func ${channel.operation}(messages <-chan *message.Message) {
    for msg := range messages {
      log.Printf("received message: %s, payload: %s", msg.UUID, string(msg.Payload))

      var m payloads.${channel.publishMessage}
      err := json.Unmarshal(msg.Payload, &m)
      if err != nil {
        fmt.Printf("error unmarshalling message: %s, err is: %s", msg.Payload, err)
        msg.Nack()
      }

      // we need to Acknowledge that we received and processed the message,
      // otherwise, it will be resent over and over again.
      msg.Ack()
    }
}
      `
    });
  
    return (
      <File name="handlers.go">
        {handlersContent}
      </File>
    );
  }