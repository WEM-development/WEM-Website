## WEM-Website

WEM company is using GoDaddy platform, for hosting website, domain provider and email services. For DNS we use CloudFlare platform, which is temporary linked to my personal account.

### What we plan for our platform ?
Having working CI/CD by GitHub platform, which would automatically update the content of website, if debug is successful.

- [x] Find way to connect GoDaddy hosting to GitHub, not just domain with DNS. (Impossible)
- [x] Use git in GoDaddy platform, with SSH connections for automations.
- [ ] Create automatic git request for both platforms. (GoDaddy - production, GitHub - testing)

The plan would be, to simply create pull request to GitHub repository, which would automatically create git push to GoDaddy platform, if the build would be sucessful.
- This specific functionality, should be possible with GitHub actions.

Useful links:
1. GitHub action repository for SSH connection - https://github.com/appleboy/ssh-action
    - Useful for our purposes to connect to GoDaddy ssh.
2. GitHub action for pushing to another existing git repository - https://stackoverflow.com/questions/64374179/how-to-push-to-another-repository-in-github-actions
    - Used after sucessful connection, with SSH to GoDaddy platform.
