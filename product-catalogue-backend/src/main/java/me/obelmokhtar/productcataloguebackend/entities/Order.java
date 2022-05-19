package me.obelmokhtar.productcataloguebackend.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;

@Entity
// obligatoire, car MySQL n'accepte pas 'order' comme nom de table vu que c un mot cle SQL.
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;
    private Double totalAmount;
    @ManyToOne
    private Customer customer;
    @OneToMany(mappedBy = "order")
    private Collection<OrderItem> orderItems;
    @OneToOne
    private Payment payment;

    @Override
    public String toString() {
        return "Order{" +
                "id=" + id +
                ", date=" + date +
                ", totalAmount=" + totalAmount +
                ", customer=" + customer +
                ", payment=" + payment +
                '}';
    }
}
