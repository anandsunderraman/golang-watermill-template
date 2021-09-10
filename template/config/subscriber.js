const { File } = require('@asyncapi/generator-react-sdk');
import { Subscriber } from '../../components/ListChannels';

export default async function({ asyncapi }) {

    const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
    //if there are no channels do nothing
    if (channelEntries.length === 0) {
        return
    }

    //if there are no subscribers then do nothing
    let hasAMQPSubscriber = channelEntries.filter(([channelName, channel]) => {
        return channel.hasPublish() && channel.bindings().amqp
    }).length > 0;

    if (!hasAMQPSubscriber) {
        return
    }

    let subscriberFlags = {
        hasAMQPSubscriber: hasAMQPSubscriber
    }

    return (
      <File name="subscribers.go">
         <Subscriber subscriberFlags={subscriberFlags} />    
      </File>
    );
  }