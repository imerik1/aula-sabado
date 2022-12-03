import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";

export interface SecondaryResult {
  id: number;
  name: string;
  quantity: number;
  primaryId: number;
}

const config = {
  daddy: "primary",
};

const UpdateSecondary = () => {
  const { id } = useParams();
  const [secondary, setSecondary] = useState<SecondaryResult | null>(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8080/secondary/${id}`).then((res) => {
      res.json().then((result) => {
        setSecondary(result);
      });
    });
  }, []);

  if (!secondary) return <h1>Carregando...</h1>;

  const handleDelete = async () => {
    await fetch(`http://localhost:8080/secondary/${id}`, {
      method: "DELETE",
    });

    window.location.replace(`/${secondary.primaryId}`);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [name, quantity] = e.currentTarget
      .elements as unknown as HTMLInputElement[];

    const body = {
      name: name.value,
      quantity: quantity.valueAsNumber,
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    await fetch(`http://localhost:8080/secondary/${id}`, {
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
              defaultValue={secondary.name}
              name="name"
            />
          ) : (
            `${secondary.name}`
          )}
        </h1>
        <h2>
          <b>Quantidade:</b>{" "}
          {update ? (
            <input
              placeholder="quantidade"
              required
              type="number"
              defaultValue={secondary.quantity}
              name="quantity"
            />
          ) : (
            `${secondary.quantity}`
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
      <NavLink to={`/${secondary.primaryId}`}>
        Voltar para a {config.daddy}
      </NavLink>
    </main>
  );
};

export default UpdateSecondary;
