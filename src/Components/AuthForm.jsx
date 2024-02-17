import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = e.target.userName.value;
    console.log(user);
    if (user) {
      localStorage.setItem("chatUser", JSON.stringify(user));
      navigate("/chat-feed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-bl from-gray-800 via-gray-900 to-gray-950 w-full">
      <div>
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="p-10 flex  rounded  items-center flex-col shadow-xl max-w-md bg-gray-800 backdrop-blur-2xl w-full mx-auto"
        >
          <p className="mb-6 font-bold text-4xl text-white">
            Chat <span className="text-teal-500">App</span>
          </p>
          <input
            type="text"
            name="userName"
            placeholder="Enter your name."
            className="px-5 text-lg outline-none border shadow-sm shadow-teal-500 border-teal-500 py-3"
          />
          <br />
          <input
            className=" cursor-pointer text-center px-4 py-3 bg-teal-500 outline-none text-white font-bold"
            type="submit"
            value="Continue to chat"
          />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
