const { File } = require('@asyncapi/generator-react-sdk');
import { Server } from '../../components/ListChannels';

export default async function({ asyncapi }) {

    const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
    //if there are no channels do nothing
    if (channelEntries.length === 0) {
        return
    }

    //if there are no amqp publisher or subscribers do nothing
    let hasAMQPPubSub = channelEntries.filter(([channelName, channel]) => {
        return (channel.hasPublish() || channel.hasSubscribe) && channel.bindings().amqp
    }).length > 0;

    if (!hasAMQPPubSub) {
        return
    }

    let pubSubFlags = {
        hasAMQPPubSub: hasAMQPPubSub
    }

  return (
    <File name="server.go">
        <Server pubSubFlags={pubSubFlags} />    
    </File>
  );
}