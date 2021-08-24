const { File } = require('@asyncapi/generator-react-sdk');

export default async function({ asyncapi }) {
    
    // let channelWrappers = [];
    // const channelEntries = Object.keys(asyncapi.channels()).length ? Object.entries(asyncapi.channels()) : [];
    // channelWrappers = channelEntries.map(([channelName, channel]) => {
    //     const publishMessage = channel.publish() ? channel.publish().message(0).payload().$id() : undefined;
    //     const subscribeMessage = channel.subscribe() ? channel.subscribe().message(0) : undefined;
    //     return {
    //         channelName: channelName,
    //         publishMessage: pascalCase(publishMessage),
    //         subscribeMessage: subscribeMessage,
    //         operation: pascalCase(channel.publish().id())
    //     }
    // })

    let routerContent = "test"
  
    return (
      <File name="router.go">
        {routerContent}
      </File>
    );
  }