import { observer } from "mobx-react";
import { AcceptStore } from "../../stores/AcceptStore";
import { EXTS_DESCR } from "../../stores/AcceptStore/exts";
import { Space, Table, Title } from "@mantine/core";
import styles from "./AvailableExtensions.module.css";
import { ReactComponent as ExternalLinkIcon } from "../../static/icons/externalLink.svg";
import classNames from "classnames";

type TProps = {
  store: AcceptStore;
};

export const AvailableExtensions = observer((props: TProps) => {
  return (
    <>
      <Title order={4}>Available extensions</Title>
      <Space h="md" />
      <Table>
        <thead>
          <tr>
            <th>Extension</th>
            <th>Description</th>
            <th>
              MIME{" "}
              <a
                target="_blank"
                rel="noreferrer"
                href="https://en.wikipedia.org/wiki/Media_type"
              >
                <ExternalLinkIcon />
              </a>
            </th>
          </tr>
        </thead>
        <tbody>
          {EXTS_DESCR.map((el) => {
            const isActive = !!props.store.extDescriptions.find(
              (inner) => inner.mime === el.mime
            );
            return (
              <tr
                key={el.mime}
                onClick={() => {
                  if (!isActive) {
                    props.store.textInput += ` ${
                      Array.isArray(el.ext) ? el.ext.join(", ") : el.ext
                    }`;
                  }
                }}
                className={classNames(styles.ext, {
                  [styles.active]: isActive,
                })}
              >
                <td>{Array.isArray(el.ext) ? el.ext.join(", ") : el.ext}</td>
                <td>{el.description}</td>
                <td>{el.mime}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
});
