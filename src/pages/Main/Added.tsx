import { observer } from "mobx-react";
import { AcceptStore } from "../../stores/AcceptStore";
import { Space, Text, Title } from "@mantine/core";

type TProps = {
  store: AcceptStore;
};

export const Added = observer((props: TProps) => {
  if (props.store.extDescriptions.length === 0) {
    return null;
  }
  
  return (
    <>
      <Title order={4}>Added extensions</Title>
      <Space h="sm" />
      {props.store.extDescriptions.map((el) => {
        return (
          <Text key={el.description}>
            {Array.isArray(el.ext) ? el.ext.join(", ") : el.ext} -{" "}
            {el.description}
          </Text>
        );
      })}
    </>
  );
});
