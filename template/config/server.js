const { File } = require('@asyncapi/generator-react-sdk');

export default async function({ asyncapi }) {
    
    let serverWrappers = [];
    const serverNames = Object.keys(asyncapi.servers()).length ? Object.entries(asyncapi.servers()) : [];
    serverWrappers = serverNames.map(([serverName, server]) => {
        return {
            name: serverName,
            url: server.url(),
            protocol: server.protocol(),
            security: server.security()
        }
    })
    
    let serverContent = `
package config

import (
	"bytes"
	"fmt"
	"text/template"
)

type Server struct {
	Protocol string
	URL string
	Credentials Credentials
}

type Credentials struct {
	User string
	Password string
}

type AsyncAPIConfig struct {
	AMQPUser string \`envconfig:"ampq_user" default:"guest"\`
	AMQPPassword string \`envconfig:"ampq_password" default:"guest"\`
	ServerName string \`envconfig:"server_name" default:"local"\`
}

func BuildURI(s Server) (string, error) {
	var result bytes.Buffer
	t, err := template.New("connectionURI").Parse("{{ .Protocol }}://{{ .Credentials.User }}:{{ .Credentials.Password }}@{{ .URL }}")
	if err != nil {
		fmt.Printf("error parsing template: %s", err)
	}

	err = t.Execute(&result, s)
	if err != nil {
		fmt.Printf("error executing template: %s", err)
		return "", err
	}
	return result.String(), nil
}
    `

    let serverList = "" 

    serverWrappers.forEach(server => {
        serverList = serverList + `
        "${server.name}": {
            Protocol: "${server.protocol}",
            URL: "${server.url}",
        },
        `
    })

    serverContent = serverContent + `
var Servers = map[string]Server{
    ${serverList}
}
    `
  
    return (
      <File name="server.go">
        {serverContent}
      </File>
    );
  }