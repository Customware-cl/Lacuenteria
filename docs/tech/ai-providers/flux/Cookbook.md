{
  "openapi": "3.1.0",
  "info": {
    "title": "BFL API",
    "description": "Authorize with an API key from your user profile.",
    "version": "0.0.1"
  },
  "paths": {
    "/v1/get_result": {
      "get": {
        "tags": [
          "Utility"
        ],
        "summary": "Get Result",
        "description": "An endpoint for getting generation task result.",
        "operationId": "get_result_v1_get_result_get",
        "parameters": [
          {
            "name": "id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ResultResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.1": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX 1.1 [pro].",
        "description": "Submits an image generation task with FLUX 1.1 [pro].",
        "operationId": "flux_pro_1_1_v1_flux_pro_1_1_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxPro11Inputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro 1 1 V1 Flux Pro 1 1 Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 [pro].",
        "description": "Submits an image generation task with the FLUX.1 [pro].",
        "operationId": "flux_pro_v1_flux_pro_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxProInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro V1 Flux Pro Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-dev": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 [dev].",
        "description": "Submits an image generation task with FLUX.1 [dev].",
        "operationId": "flux_dev_v1_flux_dev_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxDevInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Dev V1 Flux Dev Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.1-ultra": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX 1.1 [pro] with ultra mode and optional raw mode.",
        "description": "Submits an image generation task with FLUX 1.1 [pro] with ultra mode and optional raw mode.",
        "operationId": "generate_bigblue_v1_flux_pro_1_1_ultra_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxUltraInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Generate Bigblue V1 Flux Pro 1 1 Ultra Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-fill": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Fill [pro] using an input image and mask.",
        "description": "Submits an image generation task with the FLUX.1 Fill [pro] model using an input image and mask. Mask can be applied to alpha channel or submitted as a separate image.",
        "operationId": "fill_v1_flux_pro_1_0_fill_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxProFillInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Fill V1 Flux Pro 1 0 Fill Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-expand": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Expand an image by adding pixels on any side.",
        "description": "Submits an image expansion task that adds the specified number of pixels to any combination of sides (top, bottom, left, right) while maintaining context.",
        "operationId": "expand_v1_flux_pro_1_0_expand_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxProExpandInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Expand V1 Flux Pro 1 0 Expand Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-canny": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Canny [pro] using a control image.",
        "description": "Submits an image generation task with FLUX.1 Canny [pro].",
        "operationId": "pro_canny_v1_flux_pro_1_0_canny_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/CannyInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Pro Canny V1 Flux Pro 1 0 Canny Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-depth": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Depth [pro] using a control image.",
        "description": "Submits an image generation task with FLUX.1 Depth [pro].",
        "operationId": "pro_depth_v1_flux_pro_1_0_depth_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DepthInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Pro Depth V1 Flux Pro 1 0 Depth Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/finetune_details": {
      "get": {
        "tags": [
          "Utility"
        ],
        "summary": "Finetune Details",
        "description": "Get details about the training parameters and other metadata connected to a specific finetune_id that was created by the user.",
        "operationId": "finetune_details_v1_finetune_details_get",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "parameters": [
          {
            "name": "finetune_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "title": "Finetune Id"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/FinetuneDetailResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/finetune": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Finetune",
        "operationId": "finetune_v1_finetune_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FinetuneInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {}
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-finetuned": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 [pro] finetune",
        "description": "Submits an image generation task with FLUX.1 [pro] using a finetune.",
        "operationId": "flux_pro_finetuned_v1_flux_pro_finetuned_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxProFinetuneInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro Finetuned V1 Flux Pro Finetuned Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-depth-finetuned": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Depth [pro] finetune using a control image.",
        "description": "Submits an image generation task with FLUX.1 Depth [pro] finetune.",
        "operationId": "flux_pro_1_0_depth_finetuned_v1_flux_pro_1_0_depth_finetuned_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FinetuneDepthInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro 1 0 Depth Finetuned V1 Flux Pro 1 0 Depth Finetuned Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-canny-finetuned": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Canny [pro] finetune using a control image.",
        "description": "Submits an image generation task with FLUX.1 Canny [pro] finetune.",
        "operationId": "flux_pro_1_0_canny_finetuned_v1_flux_pro_1_0_canny_finetuned_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FinetuneCannyInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro 1 0 Canny Finetuned V1 Flux Pro 1 0 Canny Finetuned Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.0-fill-finetuned": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX.1 Fill [pro] finetune using an input image and mask.",
        "description": "Submits an image generation task with the FLUX.1 Fill [pro] finetune model using an input image and mask. Mask can be applied to alpha channel or submitted as a separate image.",
        "operationId": "flux_pro_1_0_fill_finetuned_v1_flux_pro_1_0_fill_finetuned_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FinetuneFluxProFillInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Flux Pro 1 0 Fill Finetuned V1 Flux Pro 1 0 Fill Finetuned Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/my_finetunes": {
      "get": {
        "tags": [
          "Utility"
        ],
        "summary": "My Finetunes",
        "description": "List all finetune_ids created by the user",
        "operationId": "my_finetunes_v1_my_finetunes_get",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/MyFinetunesResponse"
                }
              }
            }
          }
        }
      }
    },
    "/v1/delete_finetune": {
      "post": {
        "tags": [
          "Utility"
        ],
        "summary": "Delete Finetune",
        "description": "Delete a finetune_id that was created by the user",
        "operationId": "delete_finetune_v1_delete_finetune_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/DeleteFinetuneInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/DeleteFinetuneResponse"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-pro-1.1-ultra-finetuned": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Generate an image with FLUX 1.1 [pro] finetune with ultra mode.",
        "description": "Submits an image generation task with FLUX 1.1 [pro] finetune with ultra mode.",
        "operationId": "generate_bigblue_finetuned_v1_flux_pro_1_1_ultra_finetuned_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FinetuneFluxUltraInput"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Generate Bigblue Finetuned V1 Flux Pro 1 1 Ultra Finetuned Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-kontext-pro": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Edit or create an image with Flux Kontext Pro",
        "operationId": "generate_flux_kontext_pro_v1_flux_kontext_pro_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxKontextProInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Generate Flux Kontext Pro V1 Flux Kontext Pro Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    },
    "/v1/flux-kontext-max": {
      "post": {
        "tags": [
          "Tasks"
        ],
        "summary": "Edit or create an image with Flux Kontext Max",
        "operationId": "generate_flux_kontext_max_v1_flux_kontext_max_post",
        "security": [
          {
            "APIKeyHeader": []
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "$ref": "#/components/schemas/FluxKontextProInputs"
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful Response",
            "content": {
              "application/json": {
                "schema": {
                  "anyOf": [
                    {
                      "$ref": "#/components/schemas/AsyncResponse"
                    },
                    {
                      "$ref": "#/components/schemas/AsyncWebhookResponse"
                    }
                  ],
                  "title": "Response Generate Flux Kontext Max V1 Flux Kontext Max Post"
                }
              }
            }
          },
          "422": {
            "description": "Validation Error",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/HTTPValidationError"
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "AsyncResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "polling_url": {
            "type": "string",
            "title": "Polling Url"
          }
        },
        "type": "object",
        "required": [
          "id",
          "polling_url"
        ],
        "title": "AsyncResponse"
      },
      "AsyncWebhookResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id"
          },
          "status": {
            "type": "string",
            "title": "Status"
          },
          "webhook_url": {
            "type": "string",
            "title": "Webhook Url"
          }
        },
        "type": "object",
        "required": [
          "id",
          "status",
          "webhook_url"
        ],
        "title": "AsyncWebhookResponse"
      },
      "CannyInputs": {
        "properties": {
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation",
            "example": "ein fantastisches bild"
          },
          "control_image": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Control Image",
            "description": "Base64 encoded image to use as control input if no preprocessed image is provided"
          },
          "preprocessed_image": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Preprocessed Image",
            "description": "Optional pre-processed image that will bypass the control preprocessing step"
          },
          "canny_low_threshold": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 500,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Canny Low Threshold",
            "description": "Low threshold for Canny edge detection",
            "default": 50
          },
          "canny_high_threshold": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 500,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Canny High Threshold",
            "description": "High threshold for Canny edge detection",
            "default": 200
          },
          "prompt_upsampling": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility",
            "example": 42
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 15
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 100,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 30
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "prompt"
        ],
        "title": "CannyInputs"
      },
      "DeleteFinetuneInputs": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to delete.",
            "example": "my-finetune"
          }
        },
        "type": "object",
        "required": [
          "finetune_id"
        ],
        "title": "DeleteFinetuneInputs"
      },
      "DeleteFinetuneResponse": {
        "properties": {
          "status": {
            "type": "string",
            "title": "Status",
            "description": "Status of the deletion"
          },
          "message": {
            "type": "string",
            "title": "Message",
            "description": "Message about the deletion"
          },
          "deleted_finetune_id": {
            "type": "string",
            "title": "Deleted Finetune Id",
            "description": "ID of the deleted finetune"
          },
          "timestamp": {
            "type": "string",
            "title": "Timestamp",
            "description": "Timestamp of the deletion"
          }
        },
        "type": "object",
        "required": [
          "status",
          "message",
          "deleted_finetune_id",
          "timestamp"
        ],
        "title": "DeleteFinetuneResponse"
      },
      "DepthInputs": {
        "properties": {
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation",
            "example": "ein fantastisches bild"
          },
          "control_image": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Control Image",
            "description": "Base64 encoded image to use as control input"
          },
          "preprocessed_image": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Preprocessed Image",
            "description": "Optional pre-processed image that will bypass the control preprocessing step"
          },
          "prompt_upsampling": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility",
            "example": 42
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 15
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 100,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 15
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "prompt"
        ],
        "title": "DepthInputs"
      },
      "FinetuneCannyInputs": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to use.",
            "example": "my-finetune"
          },
          "finetune_strength": {
            "type": "number",
            "maximum": 2,
            "minimum": 0,
            "title": "Finetune Strength",
            "description": "Strength of the fine-tuned model. 0.0 means no influence, 1.0 means full influence. Allowed values up to 2.0",
            "default": 1.1
          },
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation",
            "example": "ein fantastisches bild"
          },
          "canny_low_threshold": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 500,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Canny Low Threshold",
            "description": "Low threshold for Canny edge detection",
            "default": 50
          },
          "canny_high_threshold": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 500,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Canny High Threshold",
            "description": "High threshold for Canny edge detection",
            "default": 200
          },
          "control_image": {
            "type": "string",
            "title": "Control Image",
            "description": "Base64 encoded image to use as control input"
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility",
            "example": 42
          },
          "steps": {
            "type": "integer",
            "maximum": 50,
            "minimum": 15,
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "guidance": {
            "type": "number",
            "maximum": 100,
            "minimum": 1,
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 30
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "finetune_id",
          "prompt",
          "control_image"
        ],
        "title": "FinetuneCannyInputs"
      },
      "FinetuneDepthInputs": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to use.",
            "example": "my-finetune"
          },
          "finetune_strength": {
            "type": "number",
            "maximum": 2,
            "minimum": 0,
            "title": "Finetune Strength",
            "description": "Strength of the fine-tuned model. 0.0 means no influence, 1.0 means full influence. Allowed values up to 2.0",
            "default": 1.1
          },
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation",
            "example": "ein fantastisches bild"
          },
          "control_image": {
            "type": "string",
            "title": "Control Image",
            "description": "Base64 encoded image to use as control input"
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility",
            "example": 42
          },
          "steps": {
            "type": "integer",
            "maximum": 50,
            "minimum": 15,
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "guidance": {
            "type": "number",
            "maximum": 100,
            "minimum": 1,
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 15
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "finetune_id",
          "prompt",
          "control_image"
        ],
        "title": "FinetuneDepthInputs"
      },
      "FinetuneDetailResponse": {
        "properties": {
          "finetune_details": {
            "additionalProperties": true,
            "type": "object",
            "title": "Finetune Details",
            "description": "Details about the parameters used for finetuning"
          }
        },
        "type": "object",
        "required": [
          "finetune_details"
        ],
        "title": "FinetuneDetailResponse"
      },
      "FinetuneFluxProFillInputs": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to use.",
            "example": "my-finetune"
          },
          "finetune_strength": {
            "type": "number",
            "maximum": 2,
            "minimum": 0,
            "title": "Finetune Strength",
            "description": "Strength of the fine-tuned model. 0.0 means no influence, 1.0 means full influence. Allowed values up to 2.0",
            "default": 1.1
          },
          "image": {
            "type": "string",
            "title": "Image",
            "description": "A Base64-encoded string representing the image you wish to modify. Can contain alpha mask if desired."
          },
          "mask": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mask",
            "description": "A Base64-encoded string representing a mask for the areas you want to modify in the image. The mask should be the same dimensions as the image and in black and white. Black areas (0%) indicate no modification, while white areas (100%) specify areas for inpainting. Optional if you provide an alpha mask in the original image. Validation: The endpoint verifies that the dimensions of the mask match the original image."
          },
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "The description of the changes you want to make. This text guides the inpainting process, allowing you to specify features, styles, or modifications for the masked area.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "steps": {
            "type": "integer",
            "maximum": 50,
            "minimum": 15,
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50,
            "example": 50
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility"
          },
          "guidance": {
            "type": "number",
            "maximum": 100,
            "minimum": 1.5,
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 60
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "finetune_id",
          "image"
        ],
        "title": "FinetuneFluxProFillInputs"
      },
      "FinetuneFluxUltraInput": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to use.",
            "example": "my-finetune"
          },
          "finetune_strength": {
            "type": "number",
            "maximum": 2,
            "minimum": 0,
            "title": "Finetune Strength",
            "description": "Strength of the fine-tuned model. 0.0 means no influence, 1.0 means full influence. Allowed values up to 2.0",
            "default": 1.2
          },
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "The prompt to use for image generation.",
            "default": "",
            "example": "A beautiful landscape with mountains and a lake"
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility. If not provided, a random seed will be used.",
            "example": 42
          },
          "aspect_ratio": {
            "type": "string",
            "title": "Aspect Ratio",
            "description": "Aspect ratio of the image between 21:9 and 9:21",
            "default": "16:9"
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional image to remix in base64 format"
          },
          "image_prompt_strength": {
            "type": "number",
            "maximum": 1,
            "minimum": 0,
            "title": "Image Prompt Strength",
            "description": "Blend between the prompt and the image prompt",
            "default": 0.1
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation",
            "default": false
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "finetune_id"
        ],
        "title": "FinetuneFluxUltraInput"
      },
      "FinetuneInputs": {
        "properties": {
          "file_data": {
            "type": "string",
            "title": "File Data",
            "description": "Base64-encoded ZIP file containing training images and, optionally, corresponding captions."
          },
          "finetune_comment": {
            "type": "string",
            "title": "Finetune Comment",
            "description": "Comment or name of the fine-tuned model. This will be added as a field to the finetune_details.",
            "example": "my-first-finetune"
          },
          "trigger_word": {
            "type": "string",
            "title": "Trigger Word",
            "description": "Trigger word for the fine-tuned model.",
            "default": "TOK",
            "example": "TOK"
          },
          "mode": {
            "type": "string",
            "enum": [
              "general",
              "character",
              "style",
              "product"
            ],
            "title": "Mode",
            "description": "Mode for the fine-tuned model. Allowed values are 'general', 'character', 'style', 'product'. This will affect the caption behaviour. General will describe the image in full detail."
          },
          "iterations": {
            "type": "integer",
            "maximum": 1000,
            "minimum": 100,
            "title": "Iterations",
            "description": "Number of iterations for fine-tuning.",
            "default": 300
          },
          "learning_rate": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 0.005,
                "minimum": 0.000001
              },
              {
                "type": "null"
              }
            ],
            "title": "Learning Rate",
            "description": "Learning rate for fine-tuning. If not provided, defaults to 1e-5 for full fine-tuning and 1e-4 for lora fine-tuning."
          },
          "captioning": {
            "type": "boolean",
            "title": "Captioning",
            "description": "Whether to enable captioning during fine-tuning.",
            "default": true
          },
          "priority": {
            "type": "string",
            "enum": [
              "speed",
              "quality",
              "high_res_only"
            ],
            "title": "Priority",
            "description": "Priority of the fine-tuning process. 'speed' will prioritize iteration speed over quality, 'quality' will prioritize quality over speed.",
            "default": "quality"
          },
          "finetune_type": {
            "type": "string",
            "enum": [
              "lora",
              "full"
            ],
            "title": "Finetune Type",
            "description": "Type of fine-tuning. 'lora' is a standard LoRA Adapter, 'full' is a full fine-tuning mode, with a post hoc lora extraction.",
            "default": "full"
          },
          "lora_rank": {
            "type": "integer",
            "enum": [
              16,
              32
            ],
            "title": "Lora Rank",
            "description": "Rank of the fine-tuned model. 16 or 32. If finetune_type is 'full', this will be the rank of the extracted lora model.",
            "default": 32
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "file_data",
          "finetune_comment",
          "mode"
        ],
        "title": "FinetuneInputs"
      },
      "FluxDevInputs": {
        "properties": {
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional base64 encoded image to use as a prompt for generation."
          },
          "width": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Width",
            "description": "Width of the generated image in pixels. Must be a multiple of 32.",
            "default": 1024
          },
          "height": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Height",
            "description": "Height of the generated image in pixels. Must be a multiple of 32.",
            "default": 768
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process.",
            "default": 28,
            "example": 28
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility.",
            "example": 42
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 5,
                "minimum": 1.5
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance scale for image generation. High guidance scales improve prompt adherence at the cost of reduced realism.",
            "default": 3,
            "example": 3
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "title": "FluxDevInputs"
      },
      "FluxKontextProInputs": {
        "properties": {
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation.",
            "example": "ein fantastisches bild"
          },
          "input_image": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Input Image",
            "description": "Base64 encoded image to use with Kontext."
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility.",
            "example": 42
          },
          "aspect_ratio": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Aspect Ratio",
            "description": "Aspect ratio of the image between 21:9 and 9:21"
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "png"
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict. Limit of 2 for Image to Image.",
            "default": 2,
            "example": 2
          }
        },
        "type": "object",
        "required": [
          "prompt"
        ],
        "title": "FluxKontextProInputs"
      },
      "FluxPro11Inputs": {
        "properties": {
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "Text prompt for image generation.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional base64 encoded image to use with Flux Redux."
          },
          "width": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Width",
            "description": "Width of the generated image in pixels. Must be a multiple of 32.",
            "default": 1024
          },
          "height": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Height",
            "description": "Height of the generated image in pixels. Must be a multiple of 32.",
            "default": 768
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility.",
            "example": 42
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "title": "FluxPro11Inputs"
      },
      "FluxProExpandInputs": {
        "properties": {
          "image": {
            "type": "string",
            "title": "Image",
            "description": "A Base64-encoded string representing the image you wish to expand."
          },
          "top": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 2048,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Top",
            "description": "Number of pixels to expand at the top of the image",
            "default": 0
          },
          "bottom": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 2048,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Bottom",
            "description": "Number of pixels to expand at the bottom of the image",
            "default": 0
          },
          "left": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 2048,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Left",
            "description": "Number of pixels to expand on the left side of the image",
            "default": 0
          },
          "right": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 2048,
                "minimum": 0
              },
              {
                "type": "null"
              }
            ],
            "title": "Right",
            "description": "Number of pixels to expand on the right side of the image",
            "default": 0
          },
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "The description of the changes you want to make. This text guides the expansion process, allowing you to specify features, styles, or modifications for the expanded areas.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 15
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50,
            "example": 50
          },
          "prompt_upsampling": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility"
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 100,
                "minimum": 1.5
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 60
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "image"
        ],
        "title": "FluxProExpandInputs"
      },
      "FluxProFillInputs": {
        "properties": {
          "image": {
            "type": "string",
            "title": "Image",
            "description": "A Base64-encoded string representing the image you wish to modify. Can contain alpha mask if desired."
          },
          "mask": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Mask",
            "description": "A Base64-encoded string representing a mask for the areas you want to modify in the image. The mask should be the same dimensions as the image and in black and white. Black areas (0%) indicate no modification, while white areas (100%) specify areas for inpainting. Optional if you provide an alpha mask in the original image. Validation: The endpoint verifies that the dimensions of the mask match the original image."
          },
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "The description of the changes you want to make. This text guides the inpainting process, allowing you to specify features, styles, or modifications for the masked area.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 15
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process",
            "default": 50,
            "example": 50
          },
          "prompt_upsampling": {
            "anyOf": [
              {
                "type": "boolean"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility"
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 100,
                "minimum": 1.5
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance strength for the image generation process",
            "default": 60
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "image"
        ],
        "title": "FluxProFillInputs"
      },
      "FluxProFinetuneInputs": {
        "properties": {
          "finetune_id": {
            "type": "string",
            "title": "Finetune Id",
            "description": "ID of the fine-tuned model you want to use.",
            "example": "my-finetune"
          },
          "finetune_strength": {
            "type": "number",
            "maximum": 2,
            "minimum": 0,
            "title": "Finetune Strength",
            "description": "Strength of the fine-tuned model. 0.0 means no influence, 1.0 means full influence. Allowed values up to 2.0",
            "default": 1.1
          },
          "steps": {
            "type": "integer",
            "maximum": 50,
            "minimum": 1,
            "title": "Steps",
            "description": "Number of steps for the fine-tuning process.",
            "default": 40,
            "example": 40
          },
          "guidance": {
            "type": "number",
            "maximum": 5,
            "minimum": 1.5,
            "title": "Guidance",
            "description": "Guidance scale for image generation. High guidance scales improve prompt adherence at the cost of reduced realism.",
            "default": 2.5,
            "example": 2.5
          },
          "prompt": {
            "type": "string",
            "title": "Prompt",
            "description": "Text prompt for image generation.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional base64 encoded image to use with Flux Redux."
          },
          "width": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Width",
            "description": "Width of the generated image in pixels. Must be a multiple of 32.",
            "default": 1024
          },
          "height": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Height",
            "description": "Height of the generated image in pixels. Must be a multiple of 32.",
            "default": 768
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "seed": {
            "type": "integer",
            "title": "Seed",
            "description": "Optional seed for reproducibility.",
            "example": 42
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "$ref": "#/components/schemas/OutputFormat",
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "required": [
          "finetune_id"
        ],
        "title": "FluxProFinetuneInputs"
      },
      "FluxProInputs": {
        "properties": {
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "Text prompt for image generation.",
            "default": "",
            "example": "ein fantastisches bild"
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional base64 encoded image to use as a prompt for generation."
          },
          "width": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Width",
            "description": "Width of the generated image in pixels. Must be a multiple of 32.",
            "default": 1024
          },
          "height": {
            "type": "integer",
            "multipleOf": 32,
            "maximum": 1440,
            "minimum": 256,
            "title": "Height",
            "description": "Height of the generated image in pixels. Must be a multiple of 32.",
            "default": 768
          },
          "steps": {
            "anyOf": [
              {
                "type": "integer",
                "maximum": 50,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Steps",
            "description": "Number of steps for the image generation process.",
            "default": 40,
            "example": 40
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility.",
            "example": 42
          },
          "guidance": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 5,
                "minimum": 1.5
              },
              {
                "type": "null"
              }
            ],
            "title": "Guidance",
            "description": "Guidance scale for image generation. High guidance scales improve prompt adherence at the cost of reduced realism.",
            "default": 2.5,
            "example": 2.5
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "interval": {
            "anyOf": [
              {
                "type": "number",
                "maximum": 4,
                "minimum": 1
              },
              {
                "type": "null"
              }
            ],
            "title": "Interval",
            "description": "Interval parameter for guidance control.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "title": "FluxProInputs"
      },
      "FluxUltraInput": {
        "properties": {
          "prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Prompt",
            "description": "The prompt to use for image generation.",
            "default": "",
            "example": "A beautiful landscape with mountains and a lake"
          },
          "prompt_upsampling": {
            "type": "boolean",
            "title": "Prompt Upsampling",
            "description": "Whether to perform upsampling on the prompt. If active, automatically modifies the prompt for more creative generation.",
            "default": false
          },
          "seed": {
            "anyOf": [
              {
                "type": "integer"
              },
              {
                "type": "null"
              }
            ],
            "title": "Seed",
            "description": "Optional seed for reproducibility. If not provided, a random seed will be used.",
            "example": 42
          },
          "aspect_ratio": {
            "type": "string",
            "title": "Aspect Ratio",
            "description": "Aspect ratio of the image between 21:9 and 9:21",
            "default": "16:9"
          },
          "safety_tolerance": {
            "type": "integer",
            "maximum": 6,
            "minimum": 0,
            "title": "Safety Tolerance",
            "description": "Tolerance level for input and output moderation. Between 0 and 6, 0 being most strict, 6 being least strict.",
            "default": 2,
            "example": 2
          },
          "output_format": {
            "anyOf": [
              {
                "$ref": "#/components/schemas/OutputFormat"
              },
              {
                "type": "null"
              }
            ],
            "description": "Output format for the generated image. Can be 'jpeg' or 'png'.",
            "default": "jpeg"
          },
          "raw": {
            "type": "boolean",
            "title": "Raw",
            "description": "Generate less processed, more natural-looking images",
            "default": false,
            "example": false
          },
          "image_prompt": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Image Prompt",
            "description": "Optional image to remix in base64 format"
          },
          "image_prompt_strength": {
            "type": "number",
            "maximum": 1,
            "minimum": 0,
            "title": "Image Prompt Strength",
            "description": "Blend between the prompt and the image prompt",
            "default": 0.1
          },
          "webhook_url": {
            "anyOf": [
              {
                "type": "string",
                "maxLength": 2083,
                "minLength": 1,
                "format": "uri"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Url",
            "description": "URL to receive webhook notifications"
          },
          "webhook_secret": {
            "anyOf": [
              {
                "type": "string"
              },
              {
                "type": "null"
              }
            ],
            "title": "Webhook Secret",
            "description": "Optional secret for webhook signature verification"
          }
        },
        "type": "object",
        "title": "FluxUltraInput"
      },
      "HTTPValidationError": {
        "properties": {
          "detail": {
            "items": {
              "$ref": "#/components/schemas/ValidationError"
            },
            "type": "array",
            "title": "Detail"
          }
        },
        "type": "object",
        "title": "HTTPValidationError"
      },
      "MyFinetunesResponse": {
        "properties": {
          "finetunes": {
            "items": {},
            "type": "array",
            "title": "Finetunes",
            "description": "List of finetunes created by the user"
          }
        },
        "type": "object",
        "required": [
          "finetunes"
        ],
        "title": "MyFinetunesResponse"
      },
      "OutputFormat": {
        "type": "string",
        "enum": [
          "jpeg",
          "png"
        ],
        "title": "OutputFormat"
      },
      "ResultResponse": {
        "properties": {
          "id": {
            "type": "string",
            "title": "Id",
            "description": "Task id for retrieving result"
          },
          "status": {
            "$ref": "#/components/schemas/StatusResponse"
          },
          "result": {
            "anyOf": [
              {},
              {
                "type": "null"
              }
            ],
            "title": "Result"
          },
          "progress": {
            "anyOf": [
              {
                "type": "number"
              },
              {
                "type": "null"
              }
            ],
            "title": "Progress"
          },
          "details": {
            "anyOf": [
              {
                "additionalProperties": true,
                "type": "object"
              },
              {
                "type": "null"
              }
            ],
            "title": "Details"
          }
        },
        "type": "object",
        "required": [
          "id",
          "status"
        ],
        "title": "ResultResponse"
      },
      "StatusResponse": {
        "type": "string",
        "enum": [
          "Task not found",
          "Pending",
          "Request Moderated",
          "Content Moderated",
          "Ready",
          "Error"
        ],
        "title": "StatusResponse"
      },
      "ValidationError": {
        "properties": {
          "loc": {
            "items": {
              "anyOf": [
                {
                  "type": "string"
                },
                {
                  "type": "integer"
                }
              ]
            },
            "type": "array",
            "title": "Location"
          },
          "msg": {
            "type": "string",
            "title": "Message"
          },
          "type": {
            "type": "string",
            "title": "Error Type"
          }
        },
        "type": "object",
        "required": [
          "loc",
          "msg",
          "type"
        ],
        "title": "ValidationError"
      }
    },
    "securitySchemes": {
      "APIKeyHeader": {
        "type": "apiKey",
        "in": "header",
        "name": "x-key"
      }
    }
  },
  "tags": [
    {
      "name": "Utility",
      "description": "These utility endpoints allow you to check the results of submitted tasks and to manage your finetunes."
    },
    {
      "name": "Tasks",
      "description": "Generation task endpoints. These endpoints allow you to submit generation tasks."
    }
  ]
}