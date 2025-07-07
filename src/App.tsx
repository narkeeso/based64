import { useEffect, useState } from "react";
import {
  AppShell,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Input,
  Stack,
  Title,
} from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { readText } from "@tauri-apps/plugin-clipboard-manager";

import "./App.css";
import BasedRow from "./BasedRow";

function App() {
  const [clipped, setClipped] = useState("");
  const [history, setHistory] = useState<Set<string>>(new Set());
  const [isAutoClip, setIsAutoClip] = useState(false);

  const convert = (text: string) => {
    try {
      const decoded = atob(text);
      const encoded = btoa(decoded);

      // don't add text that is not base64 encoded
      if (encoded !== decoded) {
        return;
      }
    } catch (error) {
      setClipped(text);
    }

    const encoded = btoa(text);

    if (!history.has(encoded)) {
      history.add(encoded);
      setHistory(new Set(history));
      setClipped("");
    }
  };

  const { start, stop } = useInterval(() => {
    readText()
      .then((text) => {
        console.log(text);
        text = text.trim();

        if (history.has(text)) {
          return;
        }

        setClipped(text);
      })
      .catch((error) => {
        console.error("Failed to read clipboard text:", error);
      });
  }, 500);

  useEffect(() => {
    if (isAutoClip) {
      start();
    } else {
      stop();
    }
  }, [isAutoClip]);

  return (
    <AppShell
      styles={{ header: { height: 35 }, main: { marginTop: 35 } }}
      padding="xl"
    >
      <AppShell.Header>
        <Title order={1} size="h2">
          Based
        </Title>
      </AppShell.Header>
      <AppShell.Main>
        <Flex align="center" gap="sm" mb="md">
          <Input.Wrapper style={{ flexGrow: 1 }}>
            <Input
              readOnly={isAutoClip}
              value={clipped}
              onChange={(event) => setClipped(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && clipped) {
                  convert(clipped);
                }
              }}
            />
          </Input.Wrapper>
          <Button onClick={() => convert(clipped)} disabled={!clipped}>
            Convert
          </Button>
        </Flex>
        <Group>
          <Checkbox
            label="Auto Clip"
            checked={isAutoClip}
            onChange={(event) => setIsAutoClip(event.currentTarget.checked)}
          />
        </Group>
        <Divider my="md" />
        <Stack>
          {Array.from(history)
            .reverse()
            .map((text) => (
              <BasedRow key={text} text={text} />
            ))}
        </Stack>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
