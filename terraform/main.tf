terraform {
  required_providers {
    aws             = {
      source        = "hashicorp/aws"
      version       = "~> 3.0"
    }
  }
}

provider "aws" {
  region     =  var.aws_region
  access_key = "AKIATNY2CFBGF72DKOOO"
  secret_key = "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"
}

variable "access_key" {
  type = string
}

variable "secret_key" {
  type = string
}

variable "aws_region" {
  type = string
  default="us-east-1"
}

variable "www_domain_name" {
  type = string
  default = "www.youreonyaron.com"
}

# .deploy/terraform/static-site/s3.tf
resource "aws_s3_bucket" "youreOnYaron_bucket" {
  bucket = var.www_domain_name
  acl = "public-read"
  policy = data.aws_iam_policy_document.website_policy.json
  website {
    index_document = "index.html"
    error_document = "index.html"
  }
}


# .deploy/terraform/static-site/iam.tf
data "aws_iam_policy_document" "website_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]
    principals {
      identifiers = ["*"]
      type = "AWS"
    }
    resources = [
      "arn:aws:s3:::${var.www_domain_name}/*"
    ]
  }
}

# .deploy/terraform/static-site/route53.tf
resource "aws_route53_zone" "primary" {
  name = "youreonyaron.com"
}

resource "aws_route53_record" "www" {
  zone_id = aws_route53_zone.primary.zone_id
  name = "youreonyaron.com"
  type = "A"
  alias {
    name = aws_s3_bucket.youreOnYaron_bucket.website_domain
    zone_id = aws_s3_bucket.youreOnYaron_bucket.hosted_zone_id
    evaluate_target_health = false
  }
}
