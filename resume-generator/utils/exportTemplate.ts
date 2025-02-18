export const generateStandaloneHTML = (content: string, title: string) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}'s Resume</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            padding: 2rem;
            max-width: 1000px;
            margin: 0 auto;
            background-color: white;
        }
        
        .prose {
            max-width: none;
        }
        
        .prose ul {
            margin-top: 0.5em;
            margin-bottom: 0.5em;
        }
        
        @media print {
            body {
                padding: 0;
            }
            
            @page {
                margin: 1cm;
            }
        }
        
        /* Print-friendly styles */
        @media print {
            html, body {
                background: white;
            }
            
            .no-print {
                display: none;
            }
        }
    </style>
</head>
<body>
    ${content}
    <div class="no-print text-center mt-8 text-sm text-gray-500">
        <p>Generated using Modern ATS Resume Generator by Jeevan Wijerathna (iamjeevan.com)</p>
        <button onclick="window.print()" class="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Print Resume
        </button>
    </div>
</body>
</html>
`
}
