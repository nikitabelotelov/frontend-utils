import { Checkbox, Grid } from "@mantine/core";
import { AcceptStore } from "../../stores/AcceptStore";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

type TProps = {
  store: AcceptStore;
};

export const Settings = observer((props: TProps) => {
  return (
    <Grid>
      <Grid.Col span={4}>
        <Checkbox
          checked={props.store.includeExtensions}
          onChange={(e) => {
            props.store.includeExtensions = e.target.checked;
          }}
          label="Include extensions"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Checkbox
          disabled={!props.store.includeExtensions}
          checked={props.store.includeUnknownExtensions}
          onChange={(e) => {
            props.store.includeUnknownExtensions = e.target.checked;
          }}
          label="Include unknown extensions"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Checkbox
          checked={props.store.asArray}
          onChange={(e) => {
            props.store.asArray = e.target.checked;
          }}
          label="As JSON"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Checkbox
          checked={props.store.defaults.allAudio}
          onChange={(e) => {
            runInAction(() => {
              props.store.defaults.allAudio = e.target.checked;
            });
          }}
          label="Include all audios"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Checkbox
          checked={props.store.defaults.allImages}
          onChange={(e) => {
            runInAction(() => {
              props.store.defaults.allImages = e.target.checked;
            });
          }}
          label="Include all images"
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <Checkbox
          checked={props.store.defaults.allVideo}
          onChange={(e) => {
            runInAction(() => {
              props.store.defaults.allVideo = e.target.checked;
            });
          }}
          label="Include all videos"
        />
      </Grid.Col>
    </Grid>
  );
});
