pipeline {
    agent any

    environment {
        AWS_REGION = 'us-west-1'                     
        ECR_REPO_NAME = 'dev/ecs'         
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        AWS_ACCOUNT_ID = 539935451710
        ECR_URI = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}"
    }

    stages {
        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${ECR_REPO_NAME}${IMAGE_TAG} -f ${env.WORKSPACE}/src/appointment/Dockerfile .
                    sh "docker build("-t ${ECR_REPO_NAME}:${IMAGE_TAG} -f ${env.WORKSPACE}/src/patient/Dockerfile .
                }

            }
        }

        stage('Tag Docker Image') {
            steps {
                script {
                   sh "docker tag ${ECR_REPO_NAME}-appointment:${IMAGE_TAG} ${ECR_URI}/${ECR_REPO_NAME}-appointment:${IMAGE_TAG}"
                   sh "docker tag ${ECR_REPO_NAME}-patient:${IMAGE_TAG} ${ECR_URI}/${ECR_REPO_NAME}-patient:${IMAGE_TAG}"
                }
            }
        }

        stage('Login to AWS ECR') {
            steps {
                script {
                    sh """
                        aws ecr get-login-password --region ${AWS_REGION} | \
                        docker login --username AWS --password-stdin ${ECR_URI}
                    """
                }
            }
        }

        stage('Push to ECR') {
            steps {
                script {   
                sh "docker push ${ECR_URI}/${ECR_REPO_NAME}-appointment:${IMAGE_TAG}"
                sh "docker push ${ECR_URI}/${ECR_REPO_NAME}-patient:${IMAGE_TAG}"
                }
            }
        }
    }

    post {
        success {
            echo "Image pushed successfully: ${ECR_URI}:${IMAGE_TAG}"
        }
        failure {
            echo "Failed to build or push Docker image"
        }
    }
}
