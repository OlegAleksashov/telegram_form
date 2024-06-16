/*import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";*/
import SendForm from "./components/SendForm";
import "@mantine/notifications/styles.css";
import "./App.css";

function App() {
  return (
    /*<MantineProvider>
      <Notifications />
      <SendForm />
    </MantineProvider>*/
    <>
      <SendForm />
    </>
  );
}

export default App;
