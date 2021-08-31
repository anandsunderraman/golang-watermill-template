const { File } = require('@asyncapi/generator-react-sdk');
import { Handlers } from '../../components/ListChannels';

export default async function({ asyncapi, params }) {
  
  return (
    <File name="handlers.go">
       <Handlers moduleName={params.moduleName} channels={asyncapi.channels()} />    
    </File>
  );
}