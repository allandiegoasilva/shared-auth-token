#!/bin/sh

# Diretório base onde estão as pastas de rotas
BASE_DIR="$FC_SETTINGS/routes"

# Encontra apenas as pastas de primeiro nível dentro de routes
for dir in "$BASE_DIR"/*; do
  if [ -d "$dir" ]; then
    # Obtém o nome da pasta de primeiro nível
    dirname=$(basename "$dir")
    
    # Cria o caminho do arquivo de saída
    output_file="$FC_SETTINGS/${dirname}_generated.json"
    
    # Inicializa o arquivo JSON
    echo "{" > "$output_file"
    echo "  \"routes\": [" >> "$output_file"
    
    # Flag para controlar vírgulas
    first=true
    
    # Encontra todos os arquivos JSON recursivamente na pasta e subpastas
    find "$dir" -name "*.json" | while read -r file; do
      # Se não for o primeiro, adiciona vírgula
      if [ "$first" = "true" ]; then
        first=false
      else
        echo "," >> "$output_file"
      fi
      
      # Lê o conteúdo do arquivo (sem as chaves de abertura e fechamento)
      content=$(cat "$file" | sed '1d;$d' | sed 's/^  /    /g')
      
      # Adiciona o conteúdo ao arquivo de saída
      echo "    {" >> "$output_file"
      echo "$content" >> "$output_file"
      echo "    }" >> "$output_file"
    done
    
    # Fecha o arquivo JSON
    echo "  ]" >> "$output_file"
    echo "}" >> "$output_file"
    
    echo "Arquivo gerado: $output_file"
  fi
done

echo "Processo concluído!"

# Executa o KrakenD
exec krakend "run" "-d" "-c" "/etc/krakend/config/krakend.tmpl"