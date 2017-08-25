import { schedule, danger } from "danger";
import { IncomingWebhook } from "@slack/client";

const issue = danger.issue as any

if (issue.title.includes("RFC:")) {
  var url = process.env.SLACK_RFC_WEBHOOK_URL || "";
  var webhook = new IncomingWebhook(url);
  schedule(
    webhook.send({
      unfurl_links: false,
      attachments: [{
        pretext: "🎉 A new Peril RFC has been published.",
        color: "good",
        title: issue.title,
        title_link: issue.url,
        author_name: issue.user.login,
        author_icon: issue.user.avatar_url
      }]
    })
  );
}
