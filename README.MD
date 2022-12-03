# COMO USAR ISSO AQUI
## RODAR O BACKEND

    cd back/
    npm install
    npm run db
    npm run dev

## RODAR O FRONTEND

    cd front/
    npm install
    npm run dev

## ESTILIZAR O ELEMENTO

    <button style={{ color: "red", padding: "10px 20px" }}></button>

## BANCO DE DADOS

### COLOCAR ISSO AQUI DENTRO DO .ENV NO BACKEND
    DATABASE_URL="mysql://root:@localhost:3306/mydb?schema=public&connection_limit=1"

### EXEMPLOS DE TIPOS NO PRISMA

    model  Example { 
	    id Int  @id  @default(autoincrement())
	    a1 String
	    a2 Boolean
	    a3 Float
	    a4 Decimal
	}

