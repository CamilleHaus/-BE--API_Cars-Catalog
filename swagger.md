# Swagger

## Como catalogar uma API com Swagger?

1. Crie um arquivo na raiz chamado "swagger.ts"

2. Adicione as configurações iniciais:

```bash
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { Router } from "express";

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "API de catalogação de carros",
            version: "1.0.0"
        }
    },
    apis: [],
}

const swaggerSpec = swaggerJSDoc(options);

export const swaggerRouter = Router()

swaggerRouter.use("", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

3. Vá para o arquivo de rotas e declare a rota do Swagger

```bash
app.use('/api/docs', swaggerRouter)
```

4. Crie uma pasta **docs** em src

5. Crie dentro da pasta **docs**, um arquivo com o nome da sua primeira rota

- ex: cars.swagger.yaml

6. Configure conforme necessário para as rotas

7. Crie um arquivo de schema