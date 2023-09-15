
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../index.css'

const Profile = () => {
  const { eid } = useParams();
  const [detail, setDetail] = useState('');

  useEffect(() => {
    async function getData() {
      const data = await axios.get('http://localhost:8080/get/' + eid);
      setDetail(data.data.Result[0]);
    }
    getData();
  }, []);

  console.log(detail);

  const { image, name, email,address,contact ,age,education,gender,department,post,salary,training} = detail;

  return (
    <div className=" profile-container" >
      <div className="d-flex justify-content-center"><img src={`http://localhost:8080/images/` + image} alt="" className='  empImg'/></div>
    <div className="mt-2">
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding:'0.5em' }}>Name</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Email</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Age</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Gender</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Address</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Contact</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Education</th>
            
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding:'0.5em'  }}>{name}</td>
            <td style={{ border: "1px solid black", padding:'0.5em'  }}>{email}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{age}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{gender}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{address}</td>
            <td style={{ border: "1px solid black", padding:'0.5em'  }}>{contact}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{education}</td>
            
          </tr>
        </tbody>
        </table>
        
      </div>
      <div className="mt-2">
      <table style={{ borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding:'0.5em' }}>Department</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Post</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Salary</th>
            <th style={{ border: "1px solid black", padding:'0.5em'  }}>Training</th>
           
            
            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding:'0.5em'  }}>{department}</td>
            <td style={{ border: "1px solid black", padding:'0.5em'  }}>{post}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{salary}</td>
            <td style={{ border: "1px solid black" , padding:'0.5em' }}>{training}</td>
           
            
          </tr>
        </tbody>
        </table>
        
    </div>
    </div>
  );
};

export default Profile;
