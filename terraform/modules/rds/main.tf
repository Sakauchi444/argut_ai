provider "aws" {
  region = var.region
}

resource "aws_rds_subnet_group" "default" {
  name       = "rds-subnet-group"
  subnet_ids = [var.subnet_id]
}

resource "aws_rds_security_group" "default" {
  name        = "rds-security-group"
  description = "RDS Security Group"
  vpc_id      = var.vpc_id

  ingress {
    from_port = 3306
    to_port   = 3306
    protocol  = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_rds_instance" "default" {
  engine         = var.db_engine
  engine_version = var.db_engine_version
  db_instance_class = var.db_instance_class
  allocated_storage = var.db_allocated_storage
  db_name          = var.db_name
  username         = var.db_username
  password         = var.db_password
  subnet_group_name = aws_rds_subnet_group.default.name
  security_groups  = [aws_rds_security_group.default.id]
  skip_final_snapshot = var.skip_final_snapshot

  lifecycle {
    ignore_changes = [
      "allocated_storage",
    ]
  }
}

output "rds_endpoint" {
  value = aws_rds_instance.default.endpoint
}