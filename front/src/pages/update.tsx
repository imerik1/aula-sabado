import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export interface SecondaryResult {
  id: number;
  name: string;
  quantity: number;
}

export interface PrimaryResult {
  id: number;
  name: string;
  age: string;
  secondaries: SecondaryResult[];
}

const config = {
  daddy: "página inicial",
  child_title: "Secondaries",
};

const Update = () => {
  const { id } = useParams();
  const [primary, setPrimary] = useState<PrimaryResult | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/primary/${id}`).then((res) => {
      res.json().then((result) => {
        setPrimary(result);
      });
    });
  }, []);

  if (!primary) return <h1>Carregando...</h1>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [name, quantity] = e.currentTarget
      .elements as unknown as HTMLInputElement[];

    const body = {
      name: name.value,
      quantity: quantity.valueAsNumber,
      primaryId: Number(id),
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    await fetch("http://localhost:8080/secondary", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    window.location.reload();
  };

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/primary/${id}`, {
      method: "DELETE",
    });

    window.location.replace("/");
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [name, age] = e.currentTarget
      .elements as unknown as HTMLInputElement[];

    const body = {
      name: name.value,
      age: age.valueAsNumber,
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    await fetch(`http://localhost:8080/primary/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(body),
    });

    window.location.reload();
  };

  const onToggleUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUpdate((update) => !update);
  };

  return (
    <main>
      <form onSubmit={handleUpdate}>
        <h1>
          <b>Nome:</b>{" "}
          {update ? (
            <input
              placeholder="nome"
              required
              defaultValue={primary.name}
              name="name"
            />
          ) : (
            `${primary.name}`
          )}
        </h1>
        <h2>
          <b>Idade:</b>{" "}
          {update ? (
            <input
              placeholder="idade"
              required
              type="number"
              defaultValue={primary.age}
              name="age"
            />
          ) : (
            `${primary.age}`
          )}
        </h2>
        <button onClick={onToggleUpdate}>
          {update ? "cancelar" : "atualizar"}
        </button>
        <button
          type={update ? "submit" : "button"}
          onClick={update ? () => null : handleDelete}
        >
          {update ? "atualizar" : "deletar"}
        </button>
      </form>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
        <input placeholder="nome" required name="name" />
        <input
          placeholder="quantidade"
          required
          type="number"
          name="quantity"
        />
        <button type="submit">criar</button>
      </form>
      <br />
      <h1>{config.child_title}</h1>
      <table border={1}>
        <thead>
          <th>Nome</th>
          <th>Quantidade</th>
        </thead>
        <tbody>
          {primary.secondaries.map((secondary, index) => {
            return (
              <tr key={`secondary-${index}`}>
                <td>
                  <NavLink to={`/secondary/${secondary.id}`}>
                    {secondary.name}
                  </NavLink>
                </td>
                <td>{secondary.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <NavLink to="/">Voltar para a {config.daddy}</NavLink>
    </main>
  );
};

export default Update;
