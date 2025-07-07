import { Button, Divider, Flex, SimpleGrid, Text } from "@mantine/core";
import { IconCopy } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { useHover } from "@mantine/hooks";

export default function BasedRow({ text }: { text: string }) {
  const [conversion, setConversion] = useState<string[]>([]);

  const { hovered: leftHovered, ref: leftRef } = useHover();
  const { hovered: rightHovered, ref: rightRef } = useHover();

  useEffect(() => {
    // render both the text and base64 conversion from text
    // first attempt to convert text to base64 to test if it's already in base64

    try {
      const decoded = atob(text);
      const reEncoded = btoa(decoded);

      if (reEncoded === text) {
        // If the text is already in base64, just set it as is
        setConversion([decoded, text]);
      } else {
        setConversion([text, btoa(text)]);
      }
    } catch (e) {
      console.error("Failed to convert text to base64:", e);
      setConversion([text, btoa(text)]);
    }
  }, [text]);

  const copy = (text: string) => {
    writeText(text);
  };

  return (
    <>
      <SimpleGrid cols={2} my={0}>
        <Flex ref={leftRef}>
          <Text flex={1} truncate>
            {conversion[0]}
          </Text>
          <Button
            variant="outline"
            size="compact-sm"
            onClick={() => copy(conversion[0])}
            opacity={leftHovered ? 1 : 0}
          >
            <IconCopy size="1rem" />
          </Button>
        </Flex>
        <Flex ref={rightRef}>
          <Text truncate flex={1}>
            {conversion[1]}
          </Text>
          <Button
            variant="outline"
            size="compact-sm"
            onClick={() => copy(conversion[1])}
            opacity={rightHovered ? 1 : 0}
          >
            <IconCopy size="1rem" />
          </Button>
        </Flex>
      </SimpleGrid>
      <Divider my={0} />
    </>
  );
}
