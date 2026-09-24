import type {
  DocumentActionComponent,
  DocumentActionsContext,
} from "sanity";

function pingRevalidate() {
  void fetch("/api/revalidate", {
    method: "POST",
    credentials: "same-origin",
  }).catch(() => {
    /* ignore */
  });
}

export function documentActions(
  prev: DocumentActionComponent[],
  _context: DocumentActionsContext,
) {
  return prev.map((action) => {
    if (
      action.action !== "publish" &&
      action.action !== "delete" &&
      action.action !== "unpublish"
    ) {
      return action;
    }

    const PublishAndRefresh: DocumentActionComponent = (props) => {
      const original = action(props);
      if (!original) return original;
      return {
        ...original,
        onHandle: async () => {
          await original.onHandle?.();
          pingRevalidate();
        },
      };
    };

    PublishAndRefresh.action = action.action;
    return PublishAndRefresh;
  });
}
