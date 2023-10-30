const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require('glob');

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    }
                },
                test: /\.jsx?$/,  // Match .js and .jsx files
                exclude: /node_modules/,
            },
            {
                use: ["style-loader", 'css-loader'],
                test: /\.css$/i,
                exclude: /node_modules/,
            }
        ]
    },
    entry: getEntryPoints(),
    plugins: generateHtmlPlugins()
    ,
    output: {
        path: path.join(__dirname, '../backend/public/Assets','js'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
      },
}

function getEntryPoints() {
    const entryFiles = glob.sync('./src/pages/*/*.jsx'); // Adjust the pattern to match your file structure
    const entryPoints = {};
  
    entryFiles.forEach((file) => {
      const name = path.basename(file, path.extname(file));
      entryPoints[name] = "./"+file.replace(/\\/g, '/');
    });
  
    return entryPoints;
  }

// Function to generate HtmlWebpackPlugin instances for each entry point
function generateHtmlPlugins() {
    const entryFiles = glob.sync('./src/pages/*/*.jsx'); // Adjust the pattern to match your file structure
    return entryFiles.map((file) => {
      const name = path.basename(file, path.extname(file));
  
      return new HtmlWebpackPlugin({
        title: name,
        scriptsrc:`Assets/js/${name}.js`,
        template: 'src/base.ejs',
        filename: path.join(__dirname, '../backend/resources/views', `${name}.blade.php`),
        inject: false,
      });
    });
  }