import OpenAI from "openai";

export default function Home() {
  const openai = new OpenAI({
    organization: "org-DXn5sGakRYYol5XnJ5Fx17U6",
    project: "proj_XsxgtXfc9GoZFeEOQQiKFq7o"
  });
  return (
    <>
      <nav></nav>
      <main>
        <input type="text" name="name" placeholder="Full name"/>
        <label htmlFor="bio">About me</label>
        <textarea name="bio" id="bio"></textarea>
        <button>✨Suggestions</button>
      </main>
    </>
  );
}
