const { File } = require('@asyncapi/generator-react-sdk');
import { Handlers } from '../../components/ListChannels';
const _ = require('lodash');

let handlersContent = (moduleName, subscriptionHandlers) => `
package handlers

import (
  "encoding/json"
  "fmt"
  "github.com/ThreeDotsLabs/watermill/message"
  "${moduleName}/payloads"
  "log"
)

${subscriptionHandlers}
`

export function pascalCase(string) {
  string = _.camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default async function({ asyncapi, params }) {
  
  // let subscriptionHandlers = SubscriptionHandlers(asyncapi.channel())
  // console.log(JSON.stringify(subscriptionHandlers));
  // let moduleName = params.moduleName
  
  return (
    <File name="handlers.go">
       <Handlers moduleName={params.moduleName} channels={asyncapi.channels()} />    
    </File>
  );
}