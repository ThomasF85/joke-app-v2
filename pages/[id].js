import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";
import Joke from "../components/Joke";

export default function JokeDetailsPage() {
  const router = useRouter();
  const {
    query: { id },
    push,
  } = router;

  async function handleEditJoke(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const jokeData = Object.fromEntries(formData);

    try {
      const response = await fetch(`/api/jokes/${id}`, {
        method: "PUT",
        body: JSON.stringify(jokeData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        push(`/`);
      } else {
        console.error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function handleDeleteJoke() {
    try {
      await fetch(`/api/jokes/${id}`, {
        method: "DELETE",
      });
      push("/");
    } catch (error) {
      console.error(error.message);
    }
  }

  return <Joke onSubmit={handleEditJoke} onDelete={handleDeleteJoke} />;
}
