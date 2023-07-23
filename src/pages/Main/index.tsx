import {
  Button,
  Container,
  CopyButton,
  Flex,
  Input,
  Space,
  Textarea,
  Title,
} from "@mantine/core";
import { useMemo } from "react";
import { observer } from "mobx-react";
import { AcceptStore } from "../../stores/AcceptStore";
import { Settings } from "./Settings";
import { Added } from "./Added";
import { AvailableExtensions } from "./AvailableExtensions";
import { Footer } from "./Footer";

export const Main = observer(() => {
  const store = useMemo(() => new AcceptStore(), []);
  return (
    <Container>
      <Space h="lg"/>
      <Title>Generate input accept attribute</Title>
      <Space h="lg"/>
      <Input
        placeholder=".jpg, .docx, .pdf"
        value={store.textInput}
        onChange={(e) => {
          store.textInput = e.target.value;
        }}
      />
      <Space h="md" />
      <Settings store={store} />
      <Space h="md" />
      <Flex>
        <Textarea
          placeholder="Attribute value"
          sx={{ flexGrow: 1 }}
          onChange={() => {}}
          value={store.extsString}
          autosize
        />
        <Space w="md" />
        <CopyButton value={store.extsString}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied" : "Copy"}
            </Button>
          )}
        </CopyButton>
      </Flex>
      <Space h="md" />
      <Added store={store}/>
      <Space h="md" />
      <AvailableExtensions store={store} />
      <Space h="xl" />
      <Footer />
    </Container>
  );
});
