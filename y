version = 0.1
[default]
[default.deploy]
[default.deploy.parameters]
stack_name = "test-culqui"
s3_bucket = "aws-sam-cli-managed-default-samclisourcebucket-1do5w3vu70cgl"
s3_prefix = "test-culqui"
region = "us-east-1"
confirm_changeset = true
capabilities = "CAPABILITY_IAM"
disable_rollback = true
image_repositories = []
