import { Container, Divider, Space, Text } from "@mantine/core";
import { observer } from "mobx-react";
import { ReactComponent as ExternalLinkIcon } from "../../static/icons/externalLink.svg";

export const Footer = observer(() => {
  return (
    <>
      <Divider />
      <Space h="md" />
      <Container>
        <a href="/">
          <Text color="gray.6">
            Source code <ExternalLinkIcon />
          </Text>
        </a>
      </Container>
      <Space h="md" />
    </>
  );
});
