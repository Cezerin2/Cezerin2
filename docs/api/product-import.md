# Product Import

A basic Google Spreadsheet product importer is to find in dashboard's Menu -> Products.

## Setup Product Import

Dashboard General Settings -> Product Import -> Google Spreadsheet
|Value|Description|
|--------------------|------|
| _Google Sheets API Key_ | ..is to find in your own Google Developer Console. Please visit herefor: https://developers.google.com/maps/documentation/javascript/get-api-key |
| _Sheet ID_ | ..the Sheet ID is in the URL of the created spreadsheet |
| _Sheet Name_ | ..the Sheet Name is as bottom table tab named of the created spreadsheet |

## Supported Table Attributes

![alt text](https://github.com/Cezerin2/cezerin2/raw/master/docs/images/product-import-spreadsheet.png "Table Attributes")

| Attribute           | Description                                                      |
| ------------------- | ---------------------------------------------------------------- |
| `category_name`     | Root first-level category                                        |
| `sub_category_name` | Sub-level category under first-level root category               |
| `sku`               | The sku number of your product                                   |
| `name`              | The product short description                                    |
| `stock_quantity`    | Product stock quantity                                           |
| `regular_price`     | Product regular price                                            |
| `enabled`           | Product visibility                                               |
| `images`            | Product images. Multiple images should be comma separated        |
| `state`             | State is marked by X. After import success is changed to a check |

## Product Images

_Please note:_ The product images have to be uploaded via dashboard's file import:
Menu -> Files
