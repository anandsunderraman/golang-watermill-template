import { File, render } from '@asyncapi/generator-react-sdk';

export default function({ asyncapi, params }) {
  
    // console.log(JSON.stringify(params))
  
    return (
      <File name="go.mod">
  {`
    module ${params.moduleName}

    go ${params.goVersion}

    require (
      github.com/ThreeDotsLabs/watermill v1.1.1
      github.com/ThreeDotsLabs/watermill-amqp v1.1.2
      github.com/kelseyhightower/envconfig v1.4.0
    )
  `}
      </File>
    );
  }