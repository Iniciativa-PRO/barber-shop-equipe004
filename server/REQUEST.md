**Obs**: Para manipular a entidade serviço o *id* é sempre numérico, diferente dos ids de qualquer outra entidade, que é uma string. O **id** tanto do agendamento, quanto do usuário tem os mesmos valores: usuário_id: "B56BNX"; agendamento_id: "B56BNX".

## Criar serviço
```
{
	"nome": "Cabelo",
	"loja": "Barber Shop",
	"preco": "50,00",
	"descricao": "Corte simples."
}
```

## Atualizar serviço
```
{
	"id": 2,
	"nome": "Barba",
	"loja": "Barber Shop",
	"preco": "20,00",
	"descricao": "Corte simples."
}
```

## Deletar serviço
```
{
	"id": 4
}
```

## Criar agendamento

```
{
	"nome": "João Das Contas",
	"email": "joaodascontas@gmail.com",
	"telefone": 9123467657,
	"senha": "123ddd",
	"id_servico": [1],
	"data": "10/03/2023",
	"hora": "15:00h"
}
```
## Login


```
{
	"email": "joaodascontas@gmail.com",
	"senha": "123ddd"
}
```

## Logout
```
{
	"id": "B56BNX"
}
```

## Criar usuário

```
{
	"nome": "João Das Contas",
	"email": "joaodascontas@gmail.com",
	"telefone": 9123467657,
	"senha": "123ddd"
}
```

## Buscar usuário
```
{
	"id": "B56BNX"
}
```

## Atualizar usuário
```
{
	"id": "B56BNX",
	"nome": "João Das Contas",
	"telefone": "3899987777",
	"senha": "346lj436h6"
}
```

## Deletar usuário
```
{
	"id": "B56BNX"
}
```

## Buscar agendamento
```
{
    "id": "B56BNX"
}
```

## Atualizar agendamento
```
{
	"id": "B56BNX",
	"data": "10/03/2023",
	"hora": "18:00h",
	"id_servico": [1]
}
```

## Deletar agendamento 
```
{
    "id": "B56BNX"
}
```