const { File } = require('@asyncapi/generator-react-sdk');
import { Router } from '../../components/ListChannels';

export default async function({ asyncapi, params }) {

    return (
      <File name="router.go">
         <Router moduleName={params.moduleName} channels={asyncapi.channels()} />    
      </File>
    );
  }