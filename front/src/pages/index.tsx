import { FormEvent, useEffect, useId, useState } from "react";
import { NavLink } from "react-router-dom";

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

const Index: React.FC = () => {
  const [primaries, setPrimaries] = useState<PrimaryResult[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/primary").then((res) => {
      res.json().then((result) => {
        setPrimaries(result);
      });
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [name, age] = e.currentTarget
      .elements as unknown as HTMLInputElement[];

    const body = {
      name: name.value,
      age: age.valueAsNumber,
    };

    const headers = new Headers();

    headers.append("Content-Type", "application/json");

    await fetch("http://localhost:8080/primary", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    window.location.reload();
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input placeholder="nome" required name="name" />
        <input placeholder="idade" required type="number" name="age" />
        <button type="submit">criar</button>
      </form>
      <table border={1}>
        <thead>
          <th>Nome</th>
          <th>Idade</th>
        </thead>
        <tbody>
          {primaries.map((primary, index) => {
            return (
              <tr key={`primary-${index}`}>
                <td>
                  <NavLink to={`/${primary.id}`}>{primary.name}</NavLink>
                </td>
                <td>{primary.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
};

export default Index;
