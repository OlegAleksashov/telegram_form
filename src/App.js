import { Notifications } from "@mantine/notifications";
import { MantineProvider } from "@mantine/core";
import { Global } from "@emotion/react";
import SendForm from "./components/SendForm";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";

function App() {
  return (
    <MantineProvider>
      <Global
        styles={() => ({
          body: {
            backgroundColor: "rgb(171, 181, 219)",
          },
        })}
      />
      <Notifications />
      <SendForm />
    </MantineProvider>
  );
}

export default App;
