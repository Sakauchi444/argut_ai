variable "region" {
  type = string
  default = "ap-northeast-1"
}

variable "vpc_id" {
  type = string
}

variable "subnet_id" {
  type = string
}

variable "security_group_id" {
  type = string
}

variable "db_name" {
  type = string
}

variable "db_username" {
  type = string
}

variable "db_password" {
  type = string
}

variable "db_instance_class" {
  type = string
  default = "db.t2.micro"
}

variable "db_allocated_storage" {
  type = number
  default = 5
}

variable "db_engine" {
  type = string
  default = "mysql"
}

variable "db_engine_version" {
  type = string
  default = "8.0"
}

variable "skip_final_snapshot" {
  type = bool
  default = true
}