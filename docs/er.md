```mermaid
erDiagram
  Trade ||--o{ PnLSnapshot : aggregates
  Config ||--o{ Trade : config
```
